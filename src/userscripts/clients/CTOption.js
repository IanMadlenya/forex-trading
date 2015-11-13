var Base = require('./Base');

function CTOption() {
    this.constructor = CTOption;

    var symbols = ['EURGBP', 'AUDNZD', 'NZDUSD', 'AUDCAD', 'USDJPY', 'AUDUSD', 'USDCAD', 'USDCHF', 'EURUSD'];

    Base.call(this, symbols);

    // Show controls for all symbols.
    symbols.forEach(function(symbol) {
        showSymbolControls(symbol);
    });
}

// Create a copy of the base "class" prototype for use in this "class."
CTOption.prototype = Object.create(Base.prototype);

CTOption.prototype.piggybackDataFeed = function() {
    var self = this;

    console.log(new Date() + ' Piggybacking on data socket');

    // Get a reference to the socket object.
    var dataSocket = io.sockets['https://client.ctoption.com:443'].transport.websocket;

    // Get references to the original callbacks for the socket.
    var originalOnOpen = dataSocket.onopen;
    var originalOnMessage = dataSocket.onmessage;
    var originalOnClose = dataSocket.onclose;
    var originalOnError = dataSocket.onerror;

    dataSocket.onopen = function() {
        console.log('Data socket opened');
        originalOnOpen();
    };

    dataSocket.onmessage = function(event) {
        try {
            var data = JSON.parse(event.data.replace('5:::', ''));
            var dataPoint;
            var quotes = [];
            var tradingMessage = {
                type: self.getTradingMessageTypes().QUOTE,
                data: []
            };

            if (data.name === 'subscribe') {
                // Filter for only the quotes we want to trade.
                quotes = data.args[0].filter(function(quote) {
                    return self.getSymbols().indexOf(quote.Symbol) > -1;
                });

                if (quotes.length > 0) {
                    // Translate the quote data into a format the trading service expects.
                    tradingMessage.data = quotes.map(function(quote) {
                        return {
                            type: tradingMessageTypes.QUOTE,
                            symbol: quote.Symbol,
                            price: parseFloat(quote.Price),
                            timestamp: parseInt(quote.TickTime + '000')
                        };
                    });

                    // Send the reformatted data to the trading service for analysis.
                    self.getTradingSocket().send(JSON.stringify(tradingMessage));
                }
            }
        }
        catch (error) {
            //console.error('DATA ERROR: ' + (error.message || error), event.data);
        }

        // Call the original callback.
        originalOnMessage(event);
    };

    dataSocket.onclose = function() {
        console.error(new Date() + ' Data socket closed');
        originalOnClose();
    };

    dataSocket.onerror = function(error) {
        console.error('ERROR: ' + (error.message || error));
        originalOnError();
    };

    dataSocket.piggybacked = true;
};

CTOption.prototype.showSymbolControls = function(symbol) {
    if ($('#assetID_10_' + symbol + ' .option_container').length > 0) {
        // Controls are already shown.
        return;
    }

    // Show the controls.
    $('#assetID_10_' + symbol + ' .box_header').click();
};

CTOption.prototype.call = function(symbol, investment) {
    // Ensure necessary parameters are present.
    if (!symbol) {
        console.error('No symbol provided');
    }
    if (!investment) {
        console.error('No investment provided');
    }

    // Ensure UI for symbol is present.
    if ($('#assetID_10_' + symbol).length === 0) {
        return;
    }

    // Ensure the controls are displayed.
    showSymbolControls(symbol);

    // Click the "CALL" button.
    $('#assetID_10_' + symbol + ' .call_btn').click();

    // Set the investment amount.
    this.setTradeInvestment(symbol, investment);

    // Initiate trade.
    this.initiateTrade(symbol);
};

CTOption.prototype.put = function(symbol, investment) {
    // Ensure necessary parameters are present.
    if (!symbol) {
        console.error('No symbol provided');
    }
    if (!investment) {
        console.error('No investment provided');
    }

    // Ensure UI for symbol is present.
    if ($('#assetID_10_' + symbol).length === 0) {
        return;
    }

    // Ensure the controls are displayed.
    showSymbolControls(symbol);

    // Click the "CALL" button.
    $('#assetID_10_' + symbol + ' .put_btn').click();

    // Set the investment amount.
    this.setTradeInvestment(symbol, investment);

    // Initiate trade.
    this.initiateTrade(symbol);
};

CTOption.prototype.setTradeInvestment = function(symbol, investment) {
    $('#assetID_10_' + symbol + ' .mount').val(investment);
    $('#assetID_10_' + symbol + ' .mount').trigger('keyup');
};

CTOption.prototype.initiateTrade = function(symbol) {
    $('#assetID_10_' + symbol + ' .apply_button').click();
};

module.exports = CTOption;
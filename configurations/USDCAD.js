var studies = require('./src/lib/studies');

module.exports = {
    combinations: [
        {
            "trendPrChannel": {
                "regression": "trendPrChannel800_2"
            },
            "prChannel": {
                "lower": "prChannelLower200_3_21",
                "upper": "prChannelUpper200_3_21"
            },
            "rsi": {
                "oversold": 23,
                "overbought": 77,
                "rsi": "rsi7"
            },
            "sma13": false,
            "ema50": false,
            "ema100": true,
            "ema200": true
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel750_2"
            },
            "prChannel": {
                "lower": "prChannelLower200_3_215",
                "upper": "prChannelUpper200_3_215"
            },
            "rsi": {
                "oversold": 23,
                "overbought": 77,
                "rsi": "rsi7"
            },
            "sma13": false,
            "ema50": false,
            "ema100": true,
            "ema200": true
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel550_2"
            },
            "prChannel": {
                "lower": "prChannelLower200_4_21",
                "upper": "prChannelUpper200_4_21"
            },
            "rsi": {
                "oversold": 20,
                "overbought": 80,
                "rsi": "rsi5"
            },
            "sma13": false,
            "ema50": false,
            "ema100": false,
            "ema200": false
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel550_2"
            },
            "prChannel": {
                "lower": "prChannelLower200_4_21",
                "upper": "prChannelUpper200_4_21"
            },
            "rsi": {
                "oversold": 23,
                "overbought": 77,
                "rsi": "rsi7"
            },
            "sma13": false,
            "ema50": false,
            "ema100": false,
            "ema200": false
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel500_2"
            },
            "prChannel": {
                "lower": "prChannelLower200_4_215",
                "upper": "prChannelUpper200_4_215"
            },
            "rsi": {
                "oversold": 20,
                "overbought": 80,
                "rsi": "rsi5"
            },
            "sma13": true,
            "ema50": true,
            "ema100": true,
            "ema200": false
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel700_2"
            },
            "prChannel": {
                "lower": "prChannelLower100_4_21",
                "upper": "prChannelUpper100_4_21"
            },
            "rsi": {
                "oversold": 20,
                "overbought": 80,
                "rsi": "rsi5"
            },
            "sma13": false,
            "ema50": true,
            "ema100": true,
            "ema200": true
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel400_2"
            },
            "prChannel": {
                "lower": "prChannelLower300_4_19",
                "upper": "prChannelUpper300_4_19"
            },
            "rsi": {
                "oversold": 23,
                "overbought": 77,
                "rsi": "rsi7"
            },
            "sma13": true,
            "ema50": true,
            "ema100": false,
            "ema200": false
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel300_2"
            },
            "prChannel": {
                "lower": "prChannelLower250_3_19",
                "upper": "prChannelUpper250_3_19"
            },
            "rsi": {
                "oversold": 20,
                "overbought": 80,
                "rsi": "rsi7"
            },
            "sma13": true,
            "ema50": true,
            "ema100": false,
            "ema200": false
        }
    ],

    studies: [
        {
            study: studies.Ema,
            inputs: {
                length: 200
            },
            outputMap: {
                ema: 'ema200'
            }
        },{
            study: studies.Ema,
            inputs: {
                length: 100
            },
            outputMap: {
                ema: 'ema100'
            }
        },{
            study: studies.Ema,
            inputs: {
                length: 50
            },
            outputMap: {
                ema: 'ema50'
            }
        },{
            study: studies.Sma,
            inputs: {
                length: 13
            },
            outputMap: {
                sma: 'sma13'
            }
        },{
            study: studies.Rsi,
            inputs: {
                length: 5
            },
            outputMap: {
                rsi: 'rsi5'
            }
        },{
            study: studies.Rsi,
            inputs: {
                length: 7
            },
            outputMap: {
                rsi: 'rsi7'
            }
        }
        {study: studies.PolynomialRegressionChannel, inputs: {length: 300, degree: 2}, outputMap: {regression: 'trendPrChannel300_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 400, degree: 2}, outputMap: {regression: 'trendPrChannel400_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 500, degree: 2}, outputMap: {regression: 'trendPrChannel500_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 550, degree: 2}, outputMap: {regression: 'trendPrChannel550_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 700, degree: 2}, outputMap: {regression: 'trendPrChannel700_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 750, degree: 2}, outputMap: {regression: 'trendPrChannel750_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 800, degree: 2}, outputMap: {regression: 'trendPrChannel800_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 100, degree: 4, deviations: 2.1}, outputMap: {regression: 'prChannel100_4_21', upper: 'prChannelUpper100_4_21', lower: 'prChannelLower100_4_21'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 200, degree: 3, deviations: 2.15}, outputMap: {regression: 'prChannel200_3_215', upper: 'prChannelUpper200_3_215', lower: 'prChannelLower200_3_215'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 200, degree: 3, deviations: 2.1}, outputMap: {regression: 'prChannel200_3_21', upper: 'prChannelUpper200_3_21', lower: 'prChannelLower200_3_21'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 200, degree: 4, deviations: 2.15}, outputMap: {regression: 'prChannel200_4_215', upper: 'prChannelUpper200_4_215', lower: 'prChannelLower200_4_215'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 200, degree: 4, deviations: 2.1}, outputMap: {regression: 'prChannel200_4_21', upper: 'prChannelUpper200_4_21', lower: 'prChannelLower200_4_21'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 250, degree: 3, deviations: 1.9}, outputMap: {regression: 'prChannel250_3_19', upper: 'prChannelUpper250_3_19', lower: 'prChannelLower250_3_19'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 300, degree: 4, deviations: 1.9}, outputMap: {regression: 'prChannel300_4_19', upper: 'prChannelUpper300_4_19', lower: 'prChannelLower300_4_19'}}
    ]
};
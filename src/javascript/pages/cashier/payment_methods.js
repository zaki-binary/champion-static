const ChampionSocket = require('./../../common/socket');
const Client         = require('../../common/client');

const CashierPaymentMethods = (function() {
    'use strict';

    const hidden_class = 'invisible';

    const load = () => {
        ChampionSocket.wait('authorize').then(() => {
            const container = $('.fx-payment-methods');
            if (!Client.is_logged_in()) {
                container.find('#btn-open-account').removeClass(hidden_class);
            } else if (!Client.is_virtual()) {
                container.find('#btn-deposit, #btn-withdraw').removeClass(hidden_class);
                ChampionSocket.send({ cashier_password: 1 }).then((response) => {
                    if (!response.error && response.cashier_password === 1) {
                        container.find('#btn-deposit, #btn-withdraw').addClass('button-disabled');
                    }
                });
            }
        });
    };

    return {
        load: load,
    };
})();

module.exports = CashierPaymentMethods;

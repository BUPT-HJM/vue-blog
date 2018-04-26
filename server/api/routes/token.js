import * as $ from '../../controllers/token_controller.js';

export default async(router) => {
    $.initUser();
    router.post('/token', $.login);
};

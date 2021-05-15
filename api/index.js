//                         ($)
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| 0_0 |)
//                      @\  =  /@
//                    ___/`-*-´\___
//                  (  \\|     |//   )
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  !  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//        ( | :  `- \`.;` \ _ /`;.`/ - ` : |  )
//         \  \ `_.   \_ _ \ /__ _/   .-` / /
//   =======`-.____`.___ \_____/___.-`___.-'================
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//     *******************************************

const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const Diet = require('./src/models/Diet.js');

// Syncing all the models at once.  
// !!!!!!!!!!!IMPORTANTE si no saco el force: true me borra los datos cada vez que se reinicia el servidor!!!!

conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log('Listening at 3001'); // eslint-disable-line no-console
          
    
    })

});

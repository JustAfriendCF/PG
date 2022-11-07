
const db = require("../DAL/DBconnection");
const competionBLL = require('../BLL/competitionBLL');

const sqlCurrentDate = () => {
    let d2 = new Date();
    let sqlD = d2.toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0];
    return sqlD;
}
const insertCompetion = async (userId) => {
    return new Promise(resolve => {
        competionBLL.get((allPCompetion) => {


            // if(!userId||userId==-1)
            if (allPCompetion) {
                const lastCompetion = allPCompetion.sort(a => a.id)[allPCompetion.length - 1];
                const lastCompetionMonth = lastCompetion && lastCompetion.date_.getMonth() + 1;
                const currentDate = new Date();
                const currentMonth = currentDate.getMonth() + 1;
                if (lastCompetionMonth && currentMonth > lastCompetionMonth) {
                    let newC = { date_: sqlCurrentDate() }
                    let query = `insert into competition set ? `;

                    db.query(query, [newC], (err, rows) => {
                        if (err) console.log(err);

                        // if (rows[0]) {
                        //     let lastProduct = rows[0];
                        //     allProduct.map(p => {
                        //         let mark = computeMark(lastProduct, p);
                        //         return { ...p, mark };
                        //     })

                        //     maxProduct = allProduct.reduce((prev, current) => (+prev.mark > +current.mark) ? prev : current)
                        // }
                        newC.id=rows.insertId;

                        // אם נוצרה תחורת חדשה- לקשר את כל התמונות שא שייות לשום תחות לתחרות הזו
                        db.query('update imageforthecompetition set idSCompetition=? where (idSCompetition is null or idSCompetition=0) and id>0 and status_=1',[rows.insertId],(err,res)=>{});
                        resolve(newC)

                    })


                }
                else resolve(lastCompetion);
            }
            resolve('failed')
        })
    });
}
module.exports = { insertCompetion };
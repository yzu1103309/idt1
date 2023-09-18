const express = require('express');
const z = require('zod');
const { validate, wrap } = require('../utils');
const DB = require('../db');
const auth = require('./auth');

const AddContestSchema = z.object({
    body: z.object({
        Name: z.string(),
        Content: z.string(),
        Place: z.string(),
        Category: z.string(),
        StartDate: z.date(),
        EndDate: z.date(),
        Deadline: z.date(),
        Url: z.string(),
        Other: z.string()
        // sp_type: z.number(),
        // q_title: z.string().max(30).min(2),
        // q_content: z.string().min(2),
    }),
});

const router = express.Router();

// router.post('/contest', auth.checkUserSession, validate(AddContestSchema), wrap(async(req, res) => {
//     /**
//      * @type {DB}
//      */

//     const db = req.app.locals.db;
//     const User_id = req.session.user.id;
//     const Name = req.body.Name;
//     const Content = req.body.Content;
//     const Place = req.body.Place;
//     const Category = req.body.Category;
//     const StartDate = req.body.StartDate;
//     const EndDate = req.body.EndDate;
//     const Deadline = req.body.Deadline;
//     const Url = req.body.Url;
//     const Other = req.body.Other;
//     await db.addQuestion(User_id, Name, Content, Place, Category, StartDate, EndDate, Deadline, Url, Other);
//     res.send({
//         status: "OK",
//         user: User_id,
//         Name: Name,
//     });
// }));

router.get('/contests', wrap(async(req, res) => {
    
    /**
      * @type {DB}
      */
    const db = req.app.locals.db;
    
    let results = await db.getContest();
    if(!results.length)
    {
         res.status(400).send({error: "無比賽"});
    }
    else
    {
         res.send(results);
    }
}));

module.exports = router;
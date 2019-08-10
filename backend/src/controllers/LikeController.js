const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        const { devId } = req.params;
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if(!targetDev)
            return res.status(400).json({ error: 'Dev not found' });

        var modified = false;
        if(!loggedDev.likes.includes(targetDev._id))
        {
            modified = true;
            loggedDev.likes.push(targetDev._id);
        }

        if(loggedDev.dislikes.includes(targetDev._id))
        {
            modified = true;
            loggedDev.dislikes = loggedDev.dislikes.filter(_id => !_id.equals(targetDev._id));
        }

        if(modified)
            await loggedDev.save();

        if(targetDev.likes.includes(loggedDev._id))
        {
            console.log('Deu match');
        }

        return res.json(loggedDev);
    }
};
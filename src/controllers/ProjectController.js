const knex = require('../database');

module.exports = {
  async index(req, res, next) {
    try {
      const { user_id, page = 1 } = req.query;
      
      const query = knex('projects')
      .limit(3)
      .offset((page - 1) * 3);
      
      const countObject = knex('projects').count();

      if (user_id) {
        query
        .where({ user_id })
        .join('users', 'users.id', '=', 'projects.user_id')
        .select('projects.*', 'users.username')
        .where('users.deleted_at', null);

        countObject
        .where({ user_id })

      }

      const [count] = await countObject;

      res.header('X-Total-Count', count["count"]);

      const result = await query;

      return res.json(result);
    } catch (error) {
      next(error);
    }
  },
  async create(req, res, next) {
    try {
      const { title, user_id } = req.body;

      await knex('projects').insert({
        title,
        user_id
      });

      return res.status(201).send()
    } catch (error) {
      next(error);
    }
  },
  async update(req, res, next) {
    try {
      const { title } = req.body;
      const { id } = req.params;

      await knex('projects')
      .update({ title })
      .where({ id });
    
      return res.send()
    } catch (error) {
      next(error);
    }
  },
  async delete(req, res, next) {
    try {
      const { id } = req.params;

      await knex('projects')
      .where({ id })
      .del();
    
      return res.send()
    } catch (error) {
      next(error);
    }
  }
};
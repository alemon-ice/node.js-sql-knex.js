
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {user_id: 12, title: 'Proffy'},
        {user_id: 12, title: 'cManager'},
        {user_id: 12, title: 'HomeGym'}
      ]);
    });
};

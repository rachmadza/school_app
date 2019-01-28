'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING,
    // TeacherId: DataTypes.INTEGER
  }, {});
  Subject.associate = function(models) {
    // associations can be defined here
    // Subject.hasMany(models.Teacher)
    Subject.hasMany(models.Teacher)
    Subject.belongsToMany(models.Student,{through:models.StudentSubject})
    // Subject.hasMany(models.Student)
  };
  return Subject;
};
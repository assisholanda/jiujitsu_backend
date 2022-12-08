// inicialização e configuração
const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

//importação dos models utilizados
const Type_user = require('../models/Type_user');
const Belt = require('../models/Belt');
const School = require('../models/School');
const Type_notice = require('../models/Type_notice');
const Status_user = require('../models/Status_user');
const Type_feedback_teacher = require('../models/Type_feedback_teacher');
const Class = require('../models/Class');
const User = require('../models/User');
const Feed = require('../models/Feed');
const WeeksFeedbackTeachers = require('../models/Weeks_feedback_teacher');
const Payment = require('../models/Payment');
const Historic_user = require('../models/Historic_user');
const Challenge = require('../models/Challenge');
const Tech = require('../models/Tech');
const Notice = require('../models/Notice');
const Result_challenge = require('../models/Result_challenge');
const UserWeekFeedback = require('../models/User_week_feedback');
const Presence = require('../models/Presence');

// conexão do model com o banco
const connection = new Sequelize(dbConfig);

// inicialização dos Models
Type_user.init(connection);
Belt.init(connection);
School.init(connection);
Type_notice.init(connection);
Status_user.init(connection);
Type_feedback_teacher.init(connection);
Class.init(connection);
User.init(connection);
Feed.init(connection);
WeeksFeedbackTeachers.init(connection);
Payment.init(connection);
Historic_user.init(connection);
Challenge.init(connection);
Tech.init(connection);
Notice.init(connection);
Result_challenge.init(connection);
UserWeekFeedback.init(connection);
Presence.init(connection);



User.associate(connection.models);
Type_notice.associate(connection.models);
Type_user.associate(connection.models);
Belt.associate(connection.models);
School.associate(connection.models);
Status_user.associate(connection.models);
Feed.associate(connection.models);
WeeksFeedbackTeachers.associate(connection.models);
Payment.associate(connection.models);
Historic_user.associate(connection.models);
Challenge.associate(connection.models);
Tech.associate(connection.models);
Notice.associate(connection.models);
Result_challenge.associate(connection.models);
UserWeekFeedback.associate(connection.models);
Type_feedback_teacher.associate(connection.models);
Class.associate(connection.models);
Presence.associate(connection.models);




module.exports = connection;
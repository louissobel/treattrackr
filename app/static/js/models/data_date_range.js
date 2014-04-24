/* DataDateRange Model */

var DAILY_DATA_MODE = 'daily'
  , WEEKLY_DATA_MODE = 'weekly'
  , MONTHLY_DATA_MODE = 'monthly'
  , YEARLY_DATA_MODE = 'yearly'
  ;

var DataDateRange = Backbone.Model.extend({
  defaults: function () {
    return {
      mode: DAILY_DATA_MODE
    , start: null
    , end: null
    }
  }
});

import { Template } from 'meteor/templating';
import ViewStandard from './ViewStandard.jsx';

import './viewStandard.html';

Template.viewStandard.helpers({

  ViewStandard() {
    return ViewStandard;
  }

});

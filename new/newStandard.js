import { Template } from 'meteor/templating';
import NewStandard from './NewStandard.jsx';

import './newStandard.html';

Template.newStandard.helpers({

  NewStandard() {
    return NewStandard;
  }

});

import { Template } from 'meteor/templating';
import EditStandard from './EditStandard.jsx';

import './editStandard.html';

Template.editStandard.helpers({

  EditStandard() {
    return EditStandard;
  }

});

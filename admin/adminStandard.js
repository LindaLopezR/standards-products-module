import { Template } from 'meteor/templating';
import AdminStandard from './AdminStandard.jsx';

import './adminStandard.html';

Template.adminStandard.helpers({

  AdminStandard() {
    return AdminStandard;
  }

});

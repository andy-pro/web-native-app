// import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';

const __root = 'https://api.github.com/',
  __users = __root + 'search/users?q=';

const getUsers = query =>
  ajax({ url: __users + query }).map(({ response }) => response.items);

const __api = {
  'get-users': getUsers,
  'replace-users': getUsers,
  // $insert,
  // $update,
  // $remove,
  // $replace,
};

export default (query, cmd, list) => __api[`${cmd}-${list}`](query);

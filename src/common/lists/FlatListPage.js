import React from 'react';

import FlatList from '../list_common/flatlist';
import { toPresident } from '../list_common/adapters';
import initialState from '../initialState';

export default () => <FlatList adapter={toPresident} data={initialState.presidents} />;

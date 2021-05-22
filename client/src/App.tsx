import React from 'react';
import { Admin, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';

import { PostList } from './components/PostList';
import { PostCreate } from './components/PostCreate';
import { PostEdit } from './components/PostEdit';

import { API_URL } from './config';

export const App: React.FC = () => (
	<Admin dataProvider={restProvider(API_URL)}>
		<Resource
			name="posts"
			list={PostList}
			create={PostCreate}
			edit={PostEdit}
		/>
	</Admin>
);

import {
	List,
	ListProps,
	Datagrid,
	TextField,
	DateField,
	EditButton,
	DeleteButton
} from 'react-admin';

export type PostListProps = ListProps & {};

export const PostList: React.FC<PostListProps> = ({ ...props }) => (
	<List {...props}>
		<Datagrid>
			<TextField source="id" />
			<TextField source="title" />
			<DateField source="publishedAt" />
			<EditButton basePath="/posts" />
			<DeleteButton basePath="/posts" />
		</Datagrid>
	</List>
);

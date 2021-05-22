import { Edit, SimpleForm, TextInput, DateInput } from 'react-admin';

export type PostEditProps = {};

export const PostEdit: React.FC<PostEditProps> = ({ ...props }) => (
	<Edit title="Edit Post" {...props}>
		<SimpleForm>
			<TextInput disabled source="id" />

			<TextInput source="title" />

			<TextInput multiline source="body" />

			<DateInput label="Published" source="publishedAt" />
		</SimpleForm>
	</Edit>
);

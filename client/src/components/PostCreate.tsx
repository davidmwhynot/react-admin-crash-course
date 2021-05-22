import { Create, SimpleForm, TextInput, DateInput } from 'react-admin';

export type PostCreateProps = {};

export const PostCreate: React.FC<PostCreateProps> = ({ ...props }) => (
	<Create title="Create a Post" {...props}>
		<SimpleForm>
			<TextInput source="title" />

			<TextInput multiline source="body" />

			<DateInput label="Published" source="publishedAt" />
		</SimpleForm>
	</Create>
);

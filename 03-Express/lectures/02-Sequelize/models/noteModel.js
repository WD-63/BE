import sequelize from '../DB/sequelize.js';
import { DataTypes } from 'sequelize';

const Note = sequelize.define(
	'Note',
	{
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	},
	{
		timestamps: true, // Adds createdAt and updatedAt fields
	}
);

Note.sync();

export default Note;

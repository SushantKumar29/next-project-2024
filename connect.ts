import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL!;

interface MongooseConnection {
	connection: Mongoose | null;
	promise: Promise<Mongoose> | null;
}

let cachedConnection: MongooseConnection = (global as any).mongoose;

if (!cachedConnection) {
	cachedConnection = (global as any).mongoose = {
		connection: null,
		promise: null,
	};
}

export const connect = async () => {
	if (cachedConnection.connection) {
		return cachedConnection.connection;
	}
	cachedConnection.promise =
		cachedConnection.promise ||
		mongoose.connect(MONGODB_URL, {
			dbName: "next-project-2024",
			bufferCommands: false,
			connectTimeoutMS: 30000,
		});

	cachedConnection.connection = await cachedConnection.promise;
	return cachedConnection.connection;
};

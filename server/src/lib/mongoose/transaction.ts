import mongoose from "mongoose";

export const mongooseTransaction = async (transactionOperation: () => void) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    transactionOperation();
    session.commitTransaction();
  } catch (error) {
    console.log(error);
    session.abortTransaction();
  } finally {
    session.endSession();
  }
};

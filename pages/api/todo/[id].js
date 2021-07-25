import connectDB from '../../../config/db';
import Todo from '../../../models/Todo';

const handler = async (req, res) => {
  await connectDB();

  const { method } = req;

  console.log(method);

  switch (method) {
    case 'PUT':
      try {
        const todo = await Todo.findByIdAndUpdate(req.query.id, req.body, {
          new: true,
          runValidators: true,
        });
        res.status(200).json({ success: true, data: todo });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const todo = await Todo.findByIdAndDelete(req.query.id);
        res.status(200).json({ success: true, data: todo });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      break;
  }
};

export default handler;

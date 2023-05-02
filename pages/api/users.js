import mongoose from "mongoose";
import {initMongoose} from "../../lib/mongoose";
import User from "../../models/User";
import {getServerSession} from "next-auth";
import {authOptions} from "./auth/[...nextauth]";
import Follower from "../../models/Follower";

export default async function handle(req, res) {
  await initMongoose();
  const session = await getServerSession(req, res, authOptions);
  const Users = [
    { id: "111", name: "John Doe", email: "johnDoe@xyz.com", password: 1232, role: "user" },
    { id: "112", name: "Jane Doe", email: "janeDoe@xyz.com", password: 1234, role: "user" },
    { id: "113", name: "Jenny Doe", email: "jennyDoe@xyz.com", password: 1235, role: "admin" },
    { id: "114", name: "Jude Doe", email: "judeDoe@xyz.com", password: 2222, role: "admin" },
];

  if (req.method === 'PUT') {
    const {username} = req.body;
    await User.findByIdAndUpdate(session.user.id, {username});
    res.json('ok');
  }
  if (req.method === 'GET') {
    const {id,username} = req.query;
    const user = id
      ? await User.findById(id)
      : await User.findOne({username});
    const follow = await Follower.findOne({
      source:session.user.id,
      destination:user._id
    });
    res.json({user,follow,Users});
  }

}
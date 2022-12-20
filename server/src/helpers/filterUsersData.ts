export default function filterUsersData(users: any) {
  return users.map((user: any) => ({
    _id: user._id.toString(),
    userName: user.userName,
    role: user.role
  }))
}
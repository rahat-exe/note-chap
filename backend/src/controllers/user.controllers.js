export const getUsers = (req, res) => {
  res.json({
    success: true,
    users: [
      { id: 1, name: "Rahat" },
      { id: 2, name: "John" },
    ],
  });
};

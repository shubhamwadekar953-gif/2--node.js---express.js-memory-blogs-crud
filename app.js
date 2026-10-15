const express = require("express");


const app = express();
const PORT = 3000;


app.use(express.json());

// In-memory array for data base
let blogs = [
      {
    "userId": 123,
    "id": 6,
    "title": "angular",
    "body": "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et",
    "createdAt" : Date.now(),
    "updatedAt" : null
  },
  {
    "userId": 1234,
    "id": 7,
    "title": "RXJS",
    "body": "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia",
    "createdAt" : Date.now(),
    "updatedAt" : null
  }
];

// 1. GET ALL BLOGS
// URL: http://localhost:3000/api/blogs
app.get("/api/blogs", (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: blogs
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error while fetching blogs",
      error: err.message
    });
  }
});

// 2. GET SINGLE BLOG BY ID
// URL: http://localhost:3000/api/blogs/123
app.get("/api/blogs/:id", (req, res) => {
  try {
    let blogId = req.params.id;

    let blog = blogs.find((b) => b.id === blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: `Blog with id ${blogId} not found`
      });
    }

    res.status(200).json({
      success: true,
      data: blog,
      message: "Blog fetched successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error while fetching blog",
      error: err.message
    });
  }
});

// 3. CREATE BLOG
// Method: POST
// URL: http://localhost:3000/api/blogs
app.post("/api/blogs", (req, res) => {
  try {
    let body = req.body;

    // New blog object
    let newBlog = {
      id: Date.now().toString(),
      title: body.title,
      content: body.content,
      author: body.author || "Anonymous",
      createdAt: new Date(),
      updatedAt: null
    };

    // Array ke start mein blog add karna
    blogs.unshift(newBlog);

    res.status(201).json({
      success: true,
      data: newBlog,
      message: "New blog created successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error while creating blog",
      error: err.message
    });
  }
});

// 4. DELETE BLOG
// Method: DELETE
// URL: http://localhost:3000/api/blogs/123
app.delete("/api/blogs/:id", (req, res) => {
  try {
    let removeId = req.params.id;

    let blogIndex = blogs.findIndex(
      (b) => b.id === removeId
    );

    if (blogIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Blog with id ${removeId} not found`
      });
    }

    // Array se blog remove karna
    let deletedBlog = blogs.splice(blogIndex, 1);

    res.status(200).json({
      success: true,
      data: deletedBlog[0],
      message: `Blog with id ${removeId} deleted successfully`
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error while deleting blog",
      error: err.message
    });
  }
});

// 5. UPDATE BLOG
// Method: PATCH
// URL: http://localhost:3000/api/blogs/123
app.patch("/api/blogs/:id", (req, res) => {
  try {
    let blogId = req.params.id;

    let blogIndex = blogs.findIndex(
      (b) => b.id === blogId
    );

    if (blogIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Blog with id ${blogId} not found`
      });
    }

    let body = req.body;
    let blog = blogs[blogIndex];


    if (body.title !== undefined) {
      blog.title = body.title;
    }

    if (body.content !== undefined) {
      blog.content = body.content;
    }

    if (body.author !== undefined) {
      blog.author = body.author;
    }

    blog.updatedAt = new Date();

    res.status(200).json({
      success: true,
      data: blog,
      message: "Blog updated successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error while updating blog",
      error: err.message
    });
  }
});

// SERVER START
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
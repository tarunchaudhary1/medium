import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@tarun_0511/medium-blog";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const token = c.req.header("authorization") || "";
  const user = await verify(token, c.env.JWT_SECRET);
  if (user) {
    //@ts-ignore
    c.set("userId", user.id);
  } else {
    c.status(403);
    return c.json({
      msg: "You are not logged in",
    });
  }
  await next();
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({
        msg: "Inputs not correct",
      });
    }
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: c.get("userId"),
      },
    });
    return c.json({
      id: blog.id,
    });
  } catch (e) {
    return c.json({ msg: "Please Sign in" });
  }
});
blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({
        msg: "Inputs not correct",
      });
    }
    const blog = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
        authorId: c.get("userId"),
      },
    });
    return c.json({
      id: blog.id,
    });
  } catch (e) {
    return c.json({ msg: "Please Sign in" });
  }
});
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const posts = await prisma.post.findMany();
    return c.json(posts);
  } catch (e) {
    return c.json({ msg: "Please Sign in" });
  }
});
blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: c.req.param("id"),
      },
    });
    return c.json({
      blog,
    });
  } catch (e) {
    return c.json({ msg: "Please Sign in" });
  }
});

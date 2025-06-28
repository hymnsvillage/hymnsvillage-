🔹 Blog Endpoints (/api/blog)
Method	Path	Access	Action
GET	/blog	Public	List all posts
POST	/blog	Authenticated	Create post
PUT	/blog/[id]	Owner/Admin	Update post
DELETE	/blog/[id]	Owner/Admin	Delete post
GET	/blog/[id]	Public	Get single post

🔹 Category Endpoints (/api/category)
Method	Path	Access	Action
GET	/category	Public	List all categories
POST	/category	Admin only	Create category
PUT	/category/[id]	Admin only	Update category
DELETE	/category/[id]	Admin only	Delete category

🔹 Tag Endpoints (/api/tag)
Method	Path	Access	Action
GET	/tag	Public	List all tags
POST	/tag	Admin only	Create tag
DELETE	/tag/[id]	Admin only	Delete tag

🔹 Comment Endpoints (/api/comment)
Method	Path	Access	Action
GET	/comment/[postId]	Public	Get all comments for post
POST	/comment/[postId]	Authenticated	Add comment to post
DELETE	/comment/delete/[id]	Owner/Admin	Delete comment

🔎 Search Endpoint (/api/search)
Method	Path	Query Params
GET	/search	q=string&category=id&tag=id

🖼️ Media Upload (/api/upload/media)
Method	Path	Access	Action
POST	/upload/media	Authenticated	Upload post image to Supabase Storage
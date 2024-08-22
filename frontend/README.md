# Junior Full-stack-Developer Exam - Frontend Part

## Approach

The approach I did here is to utilize reusability of each component. I made custom hook, context and components to satisfy the approach I did. Using Next.js, I utilized the built-in features like routing, route-groups, data fetching in server components. I also used the App-Router instead of the Pages, so I can fully utilize the features that Next.js provides. I also installed some packages for showing toast and setting cookies on the client-side. Utilizing Next.js middleware for protecting some routes if the user has no JWT token. In the protected route, I already assumed that the time would be based on the deployed server. So I formatted it in the frontend in to UTC.

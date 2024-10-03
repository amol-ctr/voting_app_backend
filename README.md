# voting_app_backend
Here, I have created a voter application backend where I have created 2 models:-
1. User--> User can be a admin or a voter
    a) He has to signup/login first
    b) He has to be logged in to see his profile and can change his password(password is encrypted)
    c) I have used JWT for authentication and created JWT Middleware so that whenever user signup/login, a token is generated and saved at client side web browser for specific time(no need to login again and again)
    d) Voter can only vote to a particular candidate,see candidate list,see counting leaderboard and cannot perform Create/Update/Delete operations
    e) Admin has the right to perform CRUD operations on candidate but cannot vote
2. Candidate-->Contains info about name,age,party of candidate
     a) This model is managed by admin itself
     b) Voter can only vote to the candidate and retrieve his/her info.

This backend is deployed on vercel on link: https://voting-app-backend-ymig.onrender.com
Routes:
1. /api/user/signup(POST)
2. /api/user/login(POST)
3. /api/user/profile(GET)
4. /api/user/password(PUT)--> update password of the user
5. /api/vote/:candidate_id(POST)-->POST a vote to a particular candidate ID
6. /api/vote/count(GET)-->GET the counting leaderboard who is leading or trailing
7. /api/candidates(GET)--> to retrieve candidate list
8. /api/create(POST)-> to create a new candidate
9. /api/update/:candidate_id(PUT)--> to update candidate with id given in params
10. /api/delete/:candidate_id(DELETE)--> to delete candidate with id given in params(who has withdrawn)

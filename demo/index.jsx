<Route path="/" file="app.jsx">
  <IndexRoute file="home.jsx"></IndexRoute>
  <Route path="/about" file="about.jsx"></Route>

  <Route path="/team" file="team.jsx">
    <Route path="/team/:username" file="team/member.jsx"></Route>
  </Route>

  <Route path="*" file="notFound.jsx"></Route>
</Route>

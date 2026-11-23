
const teams = ['گی‌مر', 'بزهای‌کوهی', 'بایرن‌مونیخ'];

const matches = [];

function calculateStandings() {
  const table = teams.map(name => ({
    name,
    played: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    gf: 0,
    ga: 0,
    points: 0
  }));

  matches.forEach(match => {
    const home = table.find(t => t.name === match.home);
    const away = table.find(t => t.name === match.away);

    if (!home || !away) return;

    home.played++;
    away.played++;

    home.gf += match.homeGoals;
    home.ga += match.awayGoals;
    away.gf += match.awayGoals;
    away.ga += match.homeGoals;

    if (match.homeGoals > match.awayGoals) {
      home.wins++;
      away.losses++;
      home.points += 3;
    } else if (match.homeGoals < match.awayGoals) {
      away.wins++;
      home.losses++;
      away.points += 3;
    } else {
      home.draws++;
      away.draws++;
      home.points++;
      away.points++;
    }
  });

  table.sort((a, b) =>
    b.points - a.points ||
    (b.gf - b.ga) - (a.gf - a.ga) ||
    b.gf - a.gf
  );

  document.getElementById('standings').innerHTML =
    table.map(t => `
      <tr>
        <td>${t.name}</td>
        <td>${t.played}</td>
        <td>${t.wins}</td>
        <td>${t.draws}</td>
        <td>${t.losses}</td>
        <td>${t.gf - t.ga}</td>
        <td>${t.points}</td>
      </tr>
    `).join('');
}

calculateStandings();

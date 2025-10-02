<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="csrf-token" content="{{ csrf_token() }}" />
  <title>Leaderboard</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #70c5ce 0%, #a0e1f5 100%);
      color: #333;
      margin: 0;
      padding: 40px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
    }
    h2 {
      font-weight: 700;
      margin-bottom: 30px;
      font-size: 2.5rem;
      color: #014f59;
      text-shadow: 1px 1px 2px #6dbfcf;
    }
    ol {
      list-style: none;
      padding: 0;
      margin: 0 auto 40px;
      width: 100%;
      max-width: 400px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.9);
      box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    }
    ol li {
      display: flex;
      justify-content: space-between;
      padding: 14px 24px;
      border-bottom: 1px solid #d6eaf5;
      font-size: 1.2rem;
      font-weight: 600;
      color: #026e85;
      transition: background-color 0.3s ease;
    }
    ol li:last-child {
      border-bottom: none;
    }
    ol li:hover {
      background-color: #d0e7f9;
    }
    .no-scores {
      font-size: 1.25rem;
      color: #026e85;
      margin-bottom: 40px;
      font-style: italic;
    }
    .back-btn {
      background-color: #026e85;
      color: white;
      border: none;
      padding: 12px 30px;
      font-size: 1.1rem;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      box-shadow: 0 4px 8px rgba(2,110,133,0.4);
    }
    .back-btn:hover {
      background-color: #014f59;
    }
  </style>
</head>
<body>
  <h2>Leaderboard</h2>

  @if (count($scores) > 0)
    <ol>
      @foreach ($scores as $score)
        <li>
          <span>{{ $score->name }}</span>
          <span>{{ $score->score }} pts</span>
        </li>
      @endforeach
    </ol>
  @else
    <p class="no-scores">No scores yet. Be the first to play!</p>
  @endif

  <button class="back-btn" onclick="window.location.href='{{ route('dashboard') }}'">Back</button>

  <script src="{{ asset('js/flappy.js') }}"></script>
</body>
</html>

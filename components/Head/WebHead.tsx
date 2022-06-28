import React from "react";
import Head from "next/head";

export default function WebHead() {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <title>Slidrr</title>

      <meta name="application-name" content="Slidrr" />
      <meta
        name="keywords"
        content="fun, game, 15 puzzle, puzzle, relaxing, competitive, sliding, sliding puzzle, sliding game"
      />
      <meta
        name="description"
        content="Play the infamous 15 puzzle! Featuring a leaderboard, custom image embedding, custom sizes and much more!"
      />
      <meta name="author" content="Sean McDougall" />
      <link rel="shortcut icon" type="image/ico" href="/favicon.svg" />

      <meta name="HandheldFriendly" content="true" />
    </Head>
  );
}

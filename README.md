# Typescript-discord-bot-template

This is a typescript template to create good discord bots, used in [Delta-bot](https://github.com/Brian3647/delta-bot)

## Usage

First, clone the repo in a local folder:

```sh
git clone https://github.com/Brian3647/typescript-discord-bot-template.git my-discord-bot && cd my-discord-bot
```

Then, install the dependencies (please use yarn):

```sh
yarn
```

Next, create a `.env` file with the following contents (where `you-discord-bot-token` is the token of your bot):

```env
TOKEN=your-discord-bot-token
```

Now, you can change the prefix of the bot editing `src/config/index.ts`:

```ts
...

const config: Config = {
	prefix: 'your-prefix'
};

...
```

You can add events and commands to the bot adding files in `src/events` or `src/commands` respectively.
The examples are `src/events/ready.ts` and `src/commands/ping.ts`

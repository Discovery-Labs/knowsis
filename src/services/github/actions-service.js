import github from '@actions/github';
import core from '@actions/core';

export async function getPullRequest() {
    // This should be a token with access to your repository scoped in as a secret.
    // The YML workflow will need to set myToken with the GitHub Secret Token
    // myToken: ${{ secrets.GITHUB_TOKEN }}
    // https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret
    const payload = github.context.payload;
    const authors = github.context.payload.commits.map(commit => commit.author)
    console.log({ payload, ctx: github.context, authors });
    // const githubToken = core.getInput('GITHUB_TOKEN');

    // const octokit = github.getOctokit(githubToken)

    // You can also pass in additional options as a second parameter to getOctokit
    // const octokit = github.getOctokit(myToken, {userAgent: "MyActionVersion1"});

    // const { data: pullRequest } = await octokit.rest.pulls.get({
    //     owner: 'Discovery-Labs',
    //     repo: 'knowsis',
    //     pull_number: 123,
    //     mediaType: {
    //       format: 'diff'
    //     }
    // });
    // console.log(pullRequest);

    return github.context;
}
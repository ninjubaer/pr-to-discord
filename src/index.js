import core from '@actions/core';
import github from '@actions/github';
import fetch from 'node-fetch';
const payload = github.context.payload;

console.log('Payload:', payload);
const message = {
    embeds: [{
        title: payload?.pull_request?.title || 'No title',
        url: payload?.pull_request?.html_url || 'https://github.com/natroteam/natromacrodev/pulls',
        describtion: payload?.pull_request?.body || 'No description',
        timestamp: new Date().toISOString()
    }],
    components: [
        {
            type: 1, // ActionRow
            components: [
                {
                    type: 2,
                    style: 5,
                    label: payload?.pull_request?.number || 'Open',
                    url: payload?.pull_request?.html_url || 'https://github.com/natroteam/natromacrodev/pulls'
                }
            ]
        }
    ]
}

fetch(core.getInput('webhook_url'), {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'natro pr action'
    },
    body: JSON.stringify(message)
})
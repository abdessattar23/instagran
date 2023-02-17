import fetch from 'node-fetch';
import cheerio from 'cheerio';


const username = 'example_user';

async function getUserInfo(username) {
  const url = `https://www.instagram.com/${username}/`;
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);

  const name = $('h1').text();
  const bio = $('span:contains("Bio")').next().text();
  const numPosts = $('span:contains("posts")').text();
  const numFollowers = $('a:contains("followers")').children().first().text();
  const numFollowing = $('a:contains("following")').children().first().text();

  const userInfo = {
    name,
    bio,
    numPosts,
    numFollowers,
    numFollowing
  };

  return userInfo;
}

getUserInfo(username)
  .then((userInfo) => {
    console.log(userInfo);
  })
  .catch((error) => {
    console.error(error);
  });

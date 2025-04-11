const GITHUB_API_BASE = "https://api.github.com";

// Function to fetch all public repos for an org (handles pagination)
export async function getOrgRepos(orgName) {
  let allRepos = [];
  let page = 1;
  const perPage = 100; // Max items per page
  let keepFetching = true;

  console.log(`Workspaceing repos for ${orgName}...`);

  while (keepFetching) {
    try {
      // Use standard fetch API (no key needed for public data)
      const response = await fetch(
        `${GITHUB_API_BASE}/orgs/${orgName}/repos?type=public&per_page=${perPage}&page=${page}`,
        {
          // Optional: Add headers for better API interaction if needed later
          // headers: {
          //   'Accept': 'application/vnd.github.v3+json',
          // },
        }
      );

      if (!response.ok) {
        // If rate limit exceeded or org not found, stop
        console.error(`Error fetching page ${page} for ${orgName}: ${response.status} ${response.statusText}`);
         // Try getting rate limit info if available
        const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining');
        if (rateLimitRemaining === '0') {
            console.warn("GitHub API rate limit likely exceeded.");
            alert("GitHub API rate limit exceeded. Please wait a while before trying again.");
        }
        keepFetching = false; // Stop fetching on error
        break;
      }

      const data = await response.json();

      if (data.length > 0) {
        allRepos = allRepos.concat(data);
        console.log(`Workspaceed page ${page}, ${data.length} repos. Total: ${allRepos.length}`);
        page++;
        // Optional: Add a small delay to avoid hitting rate limits too quickly
        // await new Promise(resolve => setTimeout(resolve, 100));
      } else {
        keepFetching = false; // No more data
      }

      // Check if we hit the absolute max results or if last page was less than perPage
      if (data.length < perPage) {
          keepFetching = false;
      }

    } catch (error) {
      console.error("Network or other error fetching repos:", error);
      keepFetching = false; // Stop fetching on error
      break;
    }
  }
  console.log(`Finished fetching for ${orgName}. Found ${allRepos.length} repos.`);
  return allRepos;
}

// Define MAANG org names (examples, might need adjustment)
export const MAANG_ORGS = {
  Meta: "facebook", // Meta's primary open source org
  Apple: "apple",
  Amazon: "aws", // Using AWS as a major Amazon org, or "amzn" / "amazon-archives"
  Netflix: "netflix",
  Google: "google", // or "googlecloud", "tensorflow", "android" etc.
};
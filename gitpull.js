const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const gitbranches = [
    'feat/walyen-08-09',
    'hotfix/volvo-08-10',
    'update/shilou-08-11',
    'fix/baibai-08-12',
    'feat/shakti-08-13',
    'hotfix/spextre-08-14',
    'update/walyen-08-15',
    'fix/volvo-08-16',
    'feat/shilou-08-17',
    'hotfix/baibai-08-18',
    'update/shakti-08-19',
    'fix/spextre-08-20',
    'feat/walyen-08-21',
    'hotfix/volvo-08-22',
    'update/shilou-08-23',
    'fix/baibai-08-24',
    'feat/shakti-08-25',
    'hotfix/spextre-08-26',
    'update/walyen-08-27',
    'fix/volvo-08-28',
    'feat/shilou-08-29',
    'hotfix/baibai-08-30',
    'update/shakti-08-31',
    'fix/spextre-09-02',
    'feat/walyen-09-02',
    'hotfix/volvo-09-03',
    'update/shilou-09-04',
    'fix/baibai-09-05',
    'feat/shakti-09-06',
    'hotfix/spextre-09-07',
    'update/walyen-09-08',
    'fix/volvo-09-09',
    'feat/shilou-09-10',
    'hotfix/baibai-09-11',
    'update/shakti-09-12',
    'fix/spextre-09-13',
    'feat/walyen-09-14',
    'hotfix/volvo-09-15',
    'update/shilou-09-16',
    'fix/baibai-09-17',
    'feat/shakti-09-18',
    'hotfix/spextre-09-19',
    'update/walyen-09-20',
    'fix/volvo-09-21',
    'feat/shilou-09-22',
    'hotfix/baibai-09-23',
    'update/shakti-09-24',
    'fix/spextre-09-25',
    'feat/walyen-09-26',
    'hotfix/volvo-09-27',
    'update/shilou-09-28',
    'fix/baibai-09-29',
    'feat/shakti-09-30',
    'hotfix/spextre-10-02',
    'update/walyen-10-02',
    'fix/volvo-10-03',
    'feat/shilou-10-04',
    'hotfix/baibai-10-05',
    'update/shakti-10-06',
    'fix/spextre-10-07',
    'feat/walyen-10-08',
    'hotfix/volvo-10-09',
    'update/shilou-10-10',
    'fix/baibai-10-11',
    'feat/shakti-10-12',
    'hotfix/spextre-10-13',
    'update/walyen-10-14',
    'fix/volvo-10-15',
    'feat/shilou-10-16',
    'hotfix/baibai-10-17',
    'update/shakti-10-18',
    'fix/spextre-10-19',
    'feat/walyen-10-20',
    'hotfix/volvo-10-21',
    'update/shilou-10-22',
    'fix/baibai-10-23',
    'feat/shakti-10-24',
    'hotfix/spextre-10-25',
    'update/walyen-10-26',
    'fix/volvo-10-27',
    'feat/shilou-10-28',
    'hotfix/baibai-10-29',
    'update/shakti-10-30',
    'fix/spextre-10-31',
    'feat/walyen-11-02',
    'hotfix/volvo-11-02',
    'update/shilou-11-03',
    'fix/baibai-11-04',
    'feat/shakti-11-05',
    'hotfix/spextre-11-06',
    'update/walyen-11-07',
    'fix/volvo-11-08',
    'feat/shilou-11-09',
    'hotfix/baibai-11-10',
    'update/shakti-11-11',
    'fix/spextre-11-12',
    'feat/walyen-11-13',
    'hotfix/volvo-11-14',
    'update/shilou-11-15',
    'fix/baibai-11-16',
    'feat/shakti-11-17',
    'hotfix/spextre-11-18',
    'update/walyen-11-19',
    'fix/volvo-11-20',
    'feat/shilou-11-21',
    'hotfix/baibai-11-22',
    'update/shakti-11-23',
    'fix/spextre-11-24',
    'feat/walyen-11-25',
    'hotfix/volvo-11-26',
    'update/shilou-11-27',
    'fix/baibai-11-28',
    'feat/shakti-11-29',
    'hotfix/spextre-11-30',
    'update/walyen-12-02',
    'fix/volvo-12-02',
    'feat/shilou-12-03',
    'hotfix/baibai-12-04',
    'update/shakti-12-05',
    'fix/spextre-12-06',
    'feat/walyen-12-07',
    'hotfix/volvo-12-08',
    'update/shilou-12-09',
    'fix/baibai-12-10',
    'feat/shakti-12-11',
    'hotfix/spextre-12-12',
    'update/walyen-12-13',
    'fix/volvo-12-14',
    'feat/shilou-12-15',
    'hotfix/baibai-12-16',
    'update/shakti-12-17',
    'fix/spextre-12-18',
    'feat/walyen-12-19',
    'hotfix/volvo-12-20',
    'update/shilou-12-21',
    'fix/baibai-12-22',
    'feat/shakti-12-23',
    'hotfix/spextre-12-24',
    'update/walyen-12-25',
    'fix/volvo-12-26',
    'feat/shilou-12-27',
    'hotfix/baibai-12-28',
    'update/shakti-12-29',
    'fix/spextre-12-30',
    'feat/walyen-12-31',
];

const comittes = [
    '[hotfix] : fixed 2993',
    '[feat] : fixed game-result',
    '[update] : updated 2994',
    '[fix] : fixed odds-calculation user-balance',
    '[feat] : fixed live-betting withdrawal-system',
    '[hotfix] : fixed 2995',
    '[update] : updated 2996',
    '[fix] : fixed match-schedule bet-history',
    '[feat] : fixed bonus-system customer-support',
    '[hotfix] : fixed 2997',
    '[update] : updated 2998',
    '[fix] : fixed payment-gateway security-updates',
    '[feat] : fixed mobile-app affiliate-program',
    '[hotfix] : fixed 2999',
    '[update] : updated 3000',
    '[fix] : fixed user-authentication notification-system',
    '[feat] : fixed in-play-betting virtual-sports',
    '[hotfix] : fixed 3002',
    '[update] : updated 3002',
    '[fix] : fixed account-verification deposit-methods',
    '[feat] : fixed esports-betting loyalty-program',
    '[hotfix] : fixed 3003',
    '[update] : updated 3004',
    '[fix] : fixed bet-slip-management user-interface',
    '[feat] : fixed cash-out-feature live-streaming',
    '[hotfix] : fixed 3005',
    '[update] : updated 3006',
    '[fix] : fixed data-integrity user-profile',
    '[feat] : fixed responsible-gambling statistics-and-analysis',
    '[hotfix] : fixed 3007',
    '[update] : updated 3008',
    '[fix] : fixed bet-limits fraud-detection',
    '[feat] : fixed promotional-offers social-media-integration',
    '[hotfix] : fixed 3009',
    '[update] : updated 3020',
    '[fix] : fixed customer-service user-feedback',
    '[feat] : fixed referral-system personalized-recommendations',
    '[hotfix] : fixed 3021',
    '[update] : updated 3022',
    '[fix] : fixed data-security bet-settlement',
    '[feat] : fixed tournament-betting live-chat-support',
    '[hotfix] : fixed 3023',
    '[update] : updated 3024',
    '[fix] : fixed system-performance user-experience',
    '[feat] : fixed multi-language-support mobile-optimization',
    '[hotfix] : fixed 3025',
    '[update] : updated 3026',
    '[fix] : fixed bet-cancellation account-management',
    '[feat] : fixed loyalty-rewards virtual-reality-betting',
    '[hotfix] : fixed 3027',
    '[update] : updated 3028',
    '[fix] : fixed bet-slip-errors payment-processing',
    '[feat] : fixed advanced-betting-options live-dealer-games',
    '[hotfix] : fixed 3029',
    '[update] : updated 3020',
    '[fix] : fixed user-verification bet-slip-validation',
    '[feat] : fixed blockchain-integration gamification-features',
    '[hotfix] : fixed 3021',
    '[update] : updated 3022',
    '[fix] : fixed user-interface-updates data-analysis',
    '[feat] : fixed voice-command-betting augmented-reality-betting',
    '[hotfix] : fixed 3023',
    '[update] : updated 3024',
    '[fix] : fixed user-feedback-system payment-security',
    '[feat] : fixed artificial-intelligence-predictions social-betting-features',
    '[hotfix] : fixed 3025',
    '[update] : updated 3026',
    '[fix] : fixed user-account-security bet-slip-errors',
    '[feat] : fixed cryptocurrency-payments personalized-offers',
    '[hotfix] : fixed 3027',
    '[update] : updated 3028',
    '[fix] : fixed user-interface-improvements system-stability',
    '[feat] : fixed virtual-reality-experiences advanced-betting-strategies',
    '[hotfix] : fixed 3029',
    '[update] : updated 3030',
    '[fix] : fixed odds-calculation user-balance',
    '[feat] : fixed live-betting withdrawal-system',
    '[hotfix] : fixed 3031',
    '[update] : updated 3032',
    '[fix] : fixed match-schedule bet-history',
    '[feat] : fixed bonus-system customer-support',
    '[hotfix] : fixed 3033',
    '[update] : updated 3034',
    '[fix] : fixed payment-gateway security-updates',
    '[feat] : fixed mobile-app affiliate-program',
    '[hotfix] : fixed 3035',
    '[update] : updated 3036',
    '[fix] : fixed user-authentication notification-system',
    '[feat] : fixed in-play-betting virtual-sports',
    '[hotfix] : fixed 3037',
    '[update] : updated 3038',
    '[fix] : fixed account-verification deposit-methods',
    '[feat] : fixed esports-betting loyalty-program',
    '[hotfix] : fixed 3039',
    '[update] : updated 3040',
    '[fix] : fixed bet-slip-management user-interface',
    '[feat] : fixed cash-out-feature live-streaming',
    '[hotfix] : fixed 3041',
    '[update] : updated 3042',
    '[fix] : fixed data-integrity user-profile',
    '[feat] : fixed responsible-gambling statistics-and-analysis',
    '[hotfix] : fixed 3043',
    '[update] : updated 3044',
    '[fix] : fixed bet-limits fraud-detection',
    '[feat] : fixed promotional-offers social-media-integration',
    '[hotfix] : fixed 3045',
    '[update] : updated 3046',
    '[fix] : fixed customer-service user-feedback',
    '[feat] : fixed referral-system personalized-recommendations',
    '[hotfix] : fixed 3047',
    '[update] : updated 3048',
    '[fix] : fixed data-security bet-settlement',
    '[feat] : fixed tournament-betting live-chat-support',
    '[hotfix] : fixed 3049',
    '[update] : updated 3050',
    '[fix] : fixed system-performance user-experience',
    '[feat] : fixed multi-language-support mobile-optimization',
    '[hotfix] : fixed 3051',
    '[update] : updated 3052',
    '[fix] : fixed bet-cancellation account-management',
    '[feat] : fixed loyalty-rewards virtual-reality-betting',
    '[hotfix] : fixed 3053',
    '[update] : updated 3054',
    '[fix] : fixed bet-slip-errors payment-processing',
    '[feat] : fixed advanced-betting-options live-dealer-games',
    '[hotfix] : fixed 3055',
    '[update] : updated 3056',
    '[fix] : fixed user-verification bet-slip-validation',
    '[feat] : fixed blockchain-integration gamification-features',
    '[hotfix] : fixed 3057',
    '[update] : updated 3058',
    '[fix] : fixed user-interface-updates data-analysis',
    '[feat] : fixed voice-command-betting augmented-reality-betting',
    '[hotfix] : fixed 3059',
    '[update] : updated 3060',
    '[fix] : fixed user-feedback-system payment-security',
    '[feat] : fixed artificial-intelligence-predictions social-betting-features',
    '[hotfix] : fixed 3061',
    '[update] : updated 3062',
    '[fix] : fixed user-account-security bet-slip-errors',
    '[feat] : fixed cryptocurrency-payments personalized-offers',
    '[hotfix] : fixed 3063',
    '[update] : updated 3064',
    '[fix] : fixed user-interface-improvements system-stability',
    '[feat] : fixed virtual-reality-experiences advanced-betting-strategies'
  ];
        // ... Your file editing logic here ...
const updateFile = (index) => {
    const filePath = 'README.md'
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    // Modify the data (example: add a line)
    const newData = data + `${comittes[index]}\n`;
    
    // Write the modified data back to the file
    fs.writeFile(filePath, newData, 'utf8', (err) => {
        if (err) {
        console.error(err);
        } else {
        console.log('File updated successfully!');
        }
    });
});
}
  
const folderPath = 'src';
const filePattern = /\.tsx$/; // Example: Edit only .txt files
let pullNum = 1
const baseBranch = 'master'
setInterval(() => {
    const index = Math.floor(Math.random() * 100);
    updateFile(index);
	pullNum++;
    exec(`git checkout -b ${gitbranches[index]}${pullNum}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        exec('git add .', (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }
            exec(`git commit -m "${comittes[index]}"`, (error, stdout, stderr) => {
                if (error) {
                  console.error(`exec error: ${error}`);
                  return;
                }
                exec(`git push -uf origin ${gitbranches[index]}${pullNum}`, (error, stdout, stderr) => {
                    if (error) {
                      console.error(`exec error: ${error}`);
                      return;
                    }
                    exec(`gh pr create --base ${baseBranch} --head ${gitbranches[index]}${pullNum} --title "${comittes[index]}" --body "${comittes[index]}" --reviewer root-js`, (error, stdout, stderr) => {
                        if (error) {
                          console.error(`exec error: ${error}`);
                          return;
                        }
                        exec(`gh pr merge ${pullNum++} --merge`, (error, stdout, stderr) => {
                          if (error) {
                            console.error(`exec error: ${error}`);
                            return;
                          }
                          console.log('okay')
                        });
                    });
                     
                });    
              });
          });    
     });
}, 30000);
const fs = require('fs');
const path = require('path');
const replace = require('replace-in-file');
const escapeRegExp = require('lodash.escaperegexp');

// 빌드를 출력하는 디렉토리
let baseDir = 'build';

// 정적 파일이 이동 될 디렉토리의 이름
let staticDir = 'images';

// 빌드 된 파일 (css, JavaScript)이 이동 될 디렉토리
let assetsDir = 'css';

// staticDir 디렉토리가 없으면 새로운 폴더를 만듭니다.
if (!fs.existsSync(path.join(__dirname, baseDir, staticDir))) {
  fs.mkdirSync(path.join(__dirname, baseDir, staticDir));
}

// assetsDir 디렉토리가 없으면 새로운 폴더를 만듭니다.
if (!fs.existsSync(path.join(__dirname, baseDir, assetsDir))) {
  fs.mkdirSync(path.join(__dirname, baseDir, assetsDir));
}

// baseDir 디렉토리를 반복합니다.
fs.readdir(`./${baseDir}`, (err, files) => {
  // 유형별로 사용자 지정 배열에 모든 파일 저장
  let html = [];
  let js = [];
  let css = [];
  let maps = [];
  let staticAssets = [];

  files.forEach((file) => {
    // 첫 번째 HTML 파일
    if (file.match(/.+\.(html)$/)) {
      console.log('html match', file);
      html.push(file);
    } else if (file.match(/.+\.(js)$/)) {
      // 다음 JavaScript
      js.push(file);
    } else if (file.match(/.+\.(map)$/)) {
      // 다음 CSS
      maps.push(file);
    } else if (file.match(/.+\.(css)$/)) {
      // 다음 소스 맵
      css.push(file);
    } else if (file.match(/.+\..+$/)) {
      // 다른 모든 파일, 현재 디렉터리 및 디렉터리를 한 수준 위로 제외
      staticAssets.push(file);
    }
  });
  // 어디로 갔는지 확인
  console.log('html', html, 'css', css, 'js', js, 'staticAssets', staticAssets);

  // 컴파일 된 모든 자산에 대한 배열 생성
  let assets = css.concat(js).concat(maps);

  // html의 다른 모든 리소스 교체
  html.forEach((file) => {
    staticAssets.forEach((name) => {
      let options = {
        files: path.join(baseDir, file),
        from: new RegExp(escapeRegExp(name), 'g'),
        to: staticDir + '/' + name,
      };
      try {
        let changedFiles = replace.sync(options);
        console.log('Modified files:', changedFiles.join(', '));
      } catch (error) {
        console.error('Error occurred:', error);
      }
    });
    assets.forEach((name) => {
      let options = {
        files: path.join(baseDir, file),
        from: new RegExp(escapeRegExp(name), 'g'),
        to: assetsDir + '/' + name,
      };
      try {
        let changedFiles = replace.sync(options);
        console.log('Modified files:', changedFiles.join(', '));
      } catch (error) {
        console.error('Error occurred:', error);
      }
    });
  });

  // js에서 맵 링크 교체
  js.forEach((file) => {
    maps.forEach((name) => {
      let options = {
        files: path.join(baseDir, file),
        from: name,
        to: '../' + assetsDir + '/' + name,
      };
      try {
        let changedFiles = replace.sync(options);
        console.log('Modified files:', changedFiles.join(', '));
      } catch (error) {
        console.error('Error occurred:', error);
      }
    });
  });

  // CSS에서 링크 교체
  css.forEach((file) => {
    staticAssets.forEach((name) => {
      let options = {
        files: path.join(baseDir, file),
        from: new RegExp(escapeRegExp(name), 'g'),
        to: '../' + staticDir + '/' + name,
      };
      try {
        let changedFiles = replace.sync(options);
        console.log('Modified files:', changedFiles.join(', '));
      } catch (error) {
        console.error('Error occurred:', error);
      }
    });
  });

  // js 및 css 및 맵 이동
  assets.forEach((name) => {
    fs.rename(
      path.join(__dirname, baseDir, name),
      path.join(__dirname, baseDir, assetsDir, name),
      function (err) {
        if (err) throw err;
        console.log(`Successfully moved ${name}`);
      }
    );
  });
  // staticAssets 이동
  staticAssets.forEach((name) => {
    fs.rename(
      path.join(__dirname, baseDir, name),
      path.join(__dirname, baseDir, staticDir, name),
      function (err) {
        if (err) throw err;
        console.log(`Successfully moved ${name}`);
      }
    );
  });
});

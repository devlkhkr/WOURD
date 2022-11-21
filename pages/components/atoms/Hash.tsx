import crypto from "crypto";
import axios from "axios";

interface HashTypes {
  stretching: number;
  createSalt: Function;
  createHashedPassword: Function;
  makePasswordHashed: Function;
}

const Hash: HashTypes = {
  stretching: 1000,
  createSalt: () => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(64, (err, buf) => {
        if (err) reject(err);
        resolve(buf.toString("base64"));
      });
    });
  },
  createHashedPassword: (plainPassword: string) => {
    return new Promise(async (resolve, reject) => {
      const salt: any = await Hash.createSalt();
      crypto.pbkdf2(
        plainPassword,
        salt,
        Hash.stretching,
        64,
        "sha512",
        (err, key) => {
          if (err) reject(err);
          resolve({ password: key.toString("base64"), salt });
        }
      );
    });
  },
  makePasswordHashed: async (loginUserId: string, plainPassword: string) => {
    const res = await axios.post("http://localhost:3000" + "/api/user/salt", {
      loginUserId: loginUserId,
    });
    if (res.data.dupLeng <= 0) {
      alert("존재하지 않는 아이디 입니다.");
      return null;
    } else if (res.data.dupLeng === 1) {
      const salt = res.data.salt;
      return new Promise(async (resolve, reject) => {
        crypto.pbkdf2(
          plainPassword,
          salt,
          Hash.stretching,
          64,
          "sha512",
          (err, key) => {
            if (err) reject(err);
            resolve(key.toString("base64"));
          }
        );
      });
    } else {
      console.log("error:::", res.data);
      return false;
    }
  },
};

export default Hash;

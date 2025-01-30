[1mdiff --git a/anchor/Cargo.lock b/anchor/Cargo.lock[m
[1mindex 3a252b0..1d1681b 100644[m
[1m--- a/anchor/Cargo.lock[m
[1m+++ b/anchor/Cargo.lock[m
[36m@@ -128,7 +128,7 @@[m [msource = "registry+https://github.com/rust-lang/crates.io-index"[m
 checksum = "e0bb0e0911ad4a70cab880cdd6287fe1e880a1a9d8e4e6defa8e9044b9796a6c"[m
 dependencies = [[m
  "anchor-syn",[m
[31m- "borsh-derive-internal 0.10.3",[m
[32m+[m[32m "borsh-derive-internal 0.10.4",[m
  "proc-macro2",[m
  "quote",[m
  "syn 1.0.109",[m
[36m@@ -164,7 +164,7 @@[m [mdependencies = [[m
  "arrayref",[m
  "base64 0.21.7",[m
  "bincode",[m
[31m- "borsh 0.10.3",[m
[32m+[m[32m "borsh 0.10.4",[m
  "bytemuck",[m
  "getrandom 0.2.15",[m
  "solana-program",[m
[36m@@ -217,9 +217,9 @@[m [mdependencies = [[m
 [m
 [[package]][m
 name = "anyhow"[m
[31m-version = "1.0.86"[m
[32m+[m[32mversion = "1.0.95"[m
 source = "registry+https://github.com/rust-lang/crates.io-index"[m
[31m-checksum = "b3d1d046238990b9cf5bcde22a3fb3584ee5cf65fb2765f454ed428c7a0063da"[m
[32m+[m[32mchecksum = "34ac096ce696dc2fcabef30516bb13c0a68a11d30131d3df6f04711467681b04"[m
 [m
 [[package]][m
 name = "ark-bn254"[m
[36m@@ -340,21 +340,21 @@[m [mdependencies = [[m
 [m
 [[package]][m
 name = "arrayref"[m
[31m-version = "0.3.8"[m
[32m+[m[32mversion = "0.3.9"[m
 source = "registry+https://github.com/rust-lang/crates.io-index"[m
[31m-checksum = "9d151e35f61089500b617991b791fc8bfd237ae50cd5950803758a179b41e67a"[m
[32m+[m[32mchecksum = "76a2e8124351fda1ef8aaaa3bbd7ebbcb486bbcd4225aca0aa0d84bb2db8fecb"[m
 [m
 [[package]][m
 name = "arrayvec"[m
[31m-version = "0.7.4"[m
[32m+[m[32mversion = "0.7.6"[m
 source = "registry+https://github.com/rust-lang/crates.io-index"[m
[31m-checksum = "96d30a06541fbafbc7f82ed10c06164cfbd2c401138f6addd8404629c4b16711"[m
[32m+[m[32mchecksum = "7c02d123df017efcdfbd739ef81735b36c5ba83ec3c59c80a9d7ecc718f92e50"[m
 [m
 [[package]][m
 name = "autocfg"[m
[31m-version = "1.3.0"[m
[32m+[m[32mversion = "1.4.0"[m
 source = "registry+https://github.com/rust-lang/crates.io-index"[m
[31m-checksum = "0c4b4d0bd25bd0b74681c0ad21497610ce1b7c91b1022cd21c80c6fbdd9476b0"[m
[32m+[m[32mchecksum = "ace50bade8e6234aa140d9a2f552bbee1db4d353f69b8217bc503490fc1a9f26"[m
 [m
 [[package]][m
 name = "base64"[m
[36m@@ -379,9 +379,9 @@[m [mdependencies = [[m
 [m
 [[package]][m
 name = "bitflags"[m
[31m-version = "2.6.0"[m
[32m+[m[32mversion = "2.8.0"[m
 source = "registry+https://github.com/rust-lang/crates.io-index"[m
[31m-checksum = "b048fb63fd8b5923fc5aa7b340d8e156aec7ec02f0c78fa8a6ddc2613f6f71de"[m
[32m+[m[32mchecksum = "8f68f53c83ab957f72c32642f3868eec03eb974d1fb82e453128456482613d36"[m
 dependencies = [[m
  "serde",[m
 ][m
[36m@@ -397,9 +397,9 @@[m [mdependencies = [[m
 [m
 [[package]][m
 name = "blake3"[m
[31m-version = "1.5.1"[m
[32m+[m[32mversion = "1.5.5"[m
 source = "registry+https://github.com/rust-lang/crates.io-index"[m
[31m-checksum = "30cca6d3674597c30ddf2c587bf8d9d65c9a84d2326d941cc79c9842dfe0ef52"[m
[32m+[m[32mchecksum = "b8ee0c1824c4dea5b5f81736aff91bae041d2c07ee1192bec91054e10e3e601e"[m
 dependencies = [[m
  "arrayref",[m
  "arrayvec",[m
[36m@@ -439,21 +439,21 @@[m [mdependencies = [[m
 [m
 [[package]][m
 name = "borsh"[m
[31m-version = "0.10.3"[m
[32m+[m[32mversion = "0.10.4"[m
 source = "registry+https://github.com/rust-lang/crates.io-index"[m
[31m-checksum = "4114279215a005bc675e386011e594e1d9b800918cea18fcadadcce864a2046b"[m
[32m+[m[32mchecksum = "115e54d64eb62cdebad391c19efc9dce4981c690c85a33a12199d99bb9546fee"[m
 dependencies = [[m
[31m- "borsh-derive 0.10.3",[m
[32m+[m[32m "borsh-derive 0.10.4",[m
  "hashbrown 0.13.2",[m
 ][m
 [m
 [[package]][m
 name = "borsh"[m
[31m-version = "1.5.1"[m
[32m+[m[32mversion = "1.5.5"[m
 source = "registry+https://github.com/rust-lang/crates.io-index"[m
[31m-checksum = "a6362ed55def622cddc70a4746a68554d7b687713770de539e59a739b249f8ed"[m
[32m+[m[32mchecksum = "543
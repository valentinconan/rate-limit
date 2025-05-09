# Rate limit
## Main purpose
This project is an example of a rate-limit implementation

## Technical details
The rest api is exposed using `nest`

Two dockers are generated:
- one based on the official `node` image
- one based on the official `alpine` image and embedding a native version of the node application, build with `pkg`

## How to build
An utility script `build.sh` allows to build project and docker images

## How to test it ?
### Get state
States endpoints :
- base : `curl  http://localhost:3000/health`
- readiness : `curl  http://localhost:3000/health/readiness` returns only http 200 code if everything is correct
- liveness : `curl  http://localhost:3000/health/liveness` returns only http 200 code if everything is correct
- probeness : `curl  http://localhost:3000/health/probeness`  returns only http 200 code if everything is correct

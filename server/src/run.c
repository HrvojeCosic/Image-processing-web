#include <stdio.h>
#define STRINGIZE(x) #x
#define STRINGIZE_VALUE_OF(x) STRINGIZE(x)

int main(int argc, char **argv) {
  printf("Image path is:, %s!\n", STRINGIZE_VALUE_OF(imagepath));
  return 0;
}
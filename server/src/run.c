#include "./dimension_tools/dimension_tools.h"
#include "./filters/filters.h"
#include "Image.h"
#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include "../lib/stb/stb_image.h"
#include "../lib/stb/stb_image_write.h"

#define STRINGIZE(param) #param
#define STRINGIZE_VALUE_OF(param) STRINGIZE(param)

int counter = 0;
char filename[64];

void setProcessedImageFilenameIndex () {
    char counterStringified[10] = {0};
    sprintf(counterStringified, "%d", counter);
    sprintf(processedImgFilename, "%s%s%s",
    "processedImg", counterStringified, getImgType(filename));
    rename("processedImg.jpg", processedImgFilename );
}


int main(int argc, char **argv) {
    strcpy(filename, STRINGIZE_VALUE_OF(originalFilename));
    setProcessedImageFilenameIndex();

    applyBinary(STRINGIZE_VALUE_OF(originalFilename));

    return 0;
}
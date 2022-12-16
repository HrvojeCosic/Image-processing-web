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


int main() {
    char filename[64];
    strcpy(filename, STRINGIZE_VALUE_OF(originalFilename));

    sprintf(processedImgFilename, "%s%s%s",
            filename, "-processed", getImgType(filename));
    rename("processedImg.jpg", processedImgFilename );

    applyBinary(STRINGIZE_VALUE_OF(originalFilename));

    return 0;
}
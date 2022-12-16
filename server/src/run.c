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

int isOptionChosen (char* option) {
    if (strcmp(STRINGIZE_VALUE_OF(processingOption), option) == 0) {
        return 1;
    }
    return 0;
}

int main() {
    char filename[64];
    strcpy(filename, STRINGIZE_VALUE_OF(originalFilename));

    sprintf(processedImgFilename, "%s%s%s",
            filename, "-processed", getImgType(filename));
    rename("processedImg.jpg", processedImgFilename );
    

    if (isOptionChosen("binary")) {
        applyBinary(filename);
    } else if (isOptionChosen("grayscale")) {
        applyGrayscale(filename);
    } else if (isOptionChosen("blur")) {
        applyBoxBlur(filename, atoi(STRINGIZE_VALUE_OF(processingValue)));
    } else if (isOptionChosen("flip")) {
        if (strcmp(STRINGIZE_VALUE_OF(processingValue), "horizontal") == 0) {
            flipHorizontal(filename);
        } else if (strcmp(STRINGIZE_VALUE_OF(processingValue), "vertical") == 0) {
            flipVertical(filename);
        }
    } else if (isOptionChosen("rotate")) {
        if (strcmp(STRINGIZE_VALUE_OF(processingValue), "left") == 0) {
            rotateLeft(filename);
        } else if (strcmp(STRINGIZE_VALUE_OF(processingValue), "right") == 0) {
           rotateRight(filename);
        }
    } else if (isOptionChosen("pixel sort")) {
        horizontalPixelSort(filename);
    }

    return 0;
}